const ValidateParam = (schema: any) => (
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any) {
    const result = originalMethod.apply(this, args);

    const [request] = [...args]

    let properties: any = null;
    let param: any = null;

    if (request.raw.method === 'POST' || request.raw.method === 'PUT' || request.raw.method === 'PATCH') {
      properties = schema.body.properties;
      param = request.body;
    } else {
      properties = schema.params.properties;
      param = request.params
    }

    for (const key in properties) {
      if (!param[key] || param[key] === undefined) {
        console.log(`Parameter ${key} is required`)
        throw new Error(`Parameter ${key} is required`)
      } else if (typeof param[key] !== properties[key].type) {
        console.log(`Parameter ${key} does not support type ${typeof param[key]}`)
        throw new Error(`Parameter ${key} does not support type ${typeof param[key]}`)
      }
    }

    return result;
  };

  return descriptor;
};

export default ValidateParam
