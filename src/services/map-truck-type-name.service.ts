const truckType = [
  {
    "id": 1,
    "group_id": 1,
    "name_en": "4 Wheels - Truck",
    "name_th": "รถกระบะ 4 ล้อ",
    "image": "fourWheelsTruck"
  },
  {
    "id": 2,
    "group_id": 1,
    "name_en": "4 Wheels - Flat Bed",
    "name_th": "รถกระบะ 4 ล้อ พื้นเรียบ",
    "image": "4WheelsFlatbed"
  },
  {
    "id": 3,
    "group_id": 1,
    "name_en": "4 Wheels - Stall Truck",
    "name_th": "รถกระบะ 4 ล้อ คอก",
    "image": "4wheelsOpenPickup"
  },
  {
    "id": 4,
    "group_id": 1,
    "name_en": "4 Wheels - Cabinet Truck",
    "name_th": "รถกระบะ 4 ล้อ ตู้ทึบ",
    "image": "4WheelsCabinetPickup"
  },
  {
    "id": 5,
    "group_id": 1,
    "name_en": "4 Wheels - Cabinet Truck + Temperature Controlled",
    "name_th": "รถกระบะ 4 ล้อ ห้องเย็น",
    "image": "4WheelsRefrigeratorPickup"
  },
  {
    "id": 6,
    "group_id": 1,
    "name_en": "4 Wheels - Cap Truck",
    "name_th": "รถกระบะ 4 ล้อ หลังคาสูงทึบ",
    "image": "4WheelsCap"
  },
  {
    "id": 7,
    "group_id": 2,
    "name_en": "6 Wheels - Flat Bed",
    "name_th": "รถ 6 ล้อ พื้นเรียบ",
    "image": "6WheelsFlatbed"
  },
  {
    "id": 8,
    "group_id": 2,
    "name_en": "6 Wheels - Pickup Truck",
    "name_th": "รถ 6 ล้อ กระบะ",
    "image": "6WheelsOpenTop"
  },
  {
    "id": 9,
    "group_id": 2,
    "name_en": "6 Wheels - Stall Truck",
    "name_th": "รถ 6 ล้อ คอก",
    "image": "6WheelsBox"
  },
  {
    "id": 10,
    "group_id": 2,
    "name_en": "6 Wheels - Cabinet Truck",
    "name_th": "รถ 6 ล้อ ตู้ทึบ",
    "image": "6WheelsCabinet"
  },
  {
    "id": 11,
    "group_id": 2,
    "name_en": "6 Wheels - Cabinet Truck - Temperature Controlled",
    "name_th": "รถ 6 ล้อ ห้องเย็น",
    "image": "6WheelsRefrigerator"
  },
  {
    "id": 12,
    "group_id": 2,
    "name_en": "6 Wheels - Liquid Truck",
    "name_th": "รถ 6 ล้อ บรรทุกของเหลว",
    "image": "6WheelsLiquidTank"
  },
  {
    "id": 13,
    "group_id": 2,
    "name_en": "6 Wheels - Crane",
    "name_th": "รถ 6 ล้อ เครน",
    "image": "6WheelsCrane"
  },
  {
    "id": 14,
    "group_id": 3,
    "name_en": "10 Wheels - Flat Bed",
    "name_th": "รถ 10 ล้อ พื้นเรียบ",
    "image": "10WheelsFlatbed"
  },
  {
    "id": 15,
    "group_id": 3,
    "name_en": "10 Wheels - Stall Truck",
    "name_th": "รถ 10 ล้อ คอก",
    "image": "10WheelBox"
  },
  {
    "id": 16,
    "group_id": 3,
    "name_en": "10 Wheels - Cabinet Truck",
    "name_th": "รถ 10 ล้อ ตู้ทึบ",
    "image": "10WheelsCabinet"
  },
  {
    "id": 17,
    "group_id": 3,
    "name_en": "10 Wheels - Cabinet Truck -Temperature Controlled",
    "name_th": "รถ 10 ล้อ ห้องเย็น",
    "image": "10WheelsRefrigerator"
  },
  {
    "id": 18,
    "group_id": 3,
    "name_en": "10 Wheels - Chemical Tanker",
    "name_th": "รถ 10 ล้อ เคมีภัณฑ์",
    "image": "10WheelsChemicalLiquidTank"
  },
  {
    "id": 19,
    "group_id": 3,
    "name_en": "10 Wheels - Liquid Tanker",
    "name_th": "รถ 10 ล้อ บรรทุกของเหลว",
    "image": "10WheelsLiquidTank"
  },
  {
    "id": 20,
    "group_id": 3,
    "name_en": "10 wheels - Fuel Tanker",
    "name_th": "รถ 10 ล้อ บรรทุกน้ำมัน",
    "image": "tenWheelsFuelTanker"
  },
  {
    "id": 21,
    "group_id": 3,
    "name_en": "10 Wheels - Crane",
    "name_th": "รถ 10 ล้อ เครน",
    "image": "10WheelsMobileCrane"
  },
  {
    "id": 22,
    "group_id": 4,
    "name_en": "18 Wheels - Flat Bed",
    "name_th": "รถเทรลเลอร์ พื้นเรียบ",
    "image": "18WheelsFlatbed"
  },
  {
    "id": 23,
    "group_id": 4,
    "name_en": "40' Trailer 18 Wheels - Stall Truck",
    "name_th": "รถเทรลเลอร์ คอก",
    "image": "fortyTrailer18WheelsStallTruck"
  },
  {
    "id": 24,
    "group_id": 5,
    "name_en": "20' Trailer 18 Wheels - Stall Truck",
    "name_th": "รถ 10 ล้อ พ่วงคอก",
    "image": "20Trainer18WheelsStallDump"
  },
  {
    "id": 25,
    "group_id": 5,
    "name_en": "20' Trailer 18 Wheels - Cabinet Truck",
    "name_th": "รถ 10 ล้อ พ่วงตู้ทึบ",
    "image": "20Trailer18WheelsCabinet"
  },
  {
    "id": 26,
    "group_id": 5,
    "name_en": "20' Trailer 18 Wheels - Cabinet truck -Temperature Controlled",
    "name_th": "รถ 10 ล้อ พ่วงห้องเย็น",
    "image": "20Trailer18WheelsRefrigerator"
  },
  {
    "id": 27,
    "group_id": 6,
    "name_en": "Car Carrier Trailer",
    "name_th": "รถบรรทุกรถ",
    "image": "12WheelsCarCarrier"
  },
  {
    "id": 28,
    "group_id": 6,
    "name_en": "Bike Carrier Truck",
    "name_th": "รถบรรทุกจักรยานยนต์",
    "image": "6WheelsMotobikeCarrier"
  },
  {
    "id": 29,
    "group_id": 6,
    "name_en": "Others",
    "name_th": "อื่นๆ",
    "image": "other"
  },
  {
    "id": 30,
    "group_id": 7,
    "name_en": "Tractor Head Truck",
    "name_th": "รถหัวลาก",
    "image": "tractorHeadTruck"
  },
  {
    "id": 31,
    "group_id": 7,
    "name_en": "40' Trailer - Cabinet Truck",
    "name_th": "รถหัวลาก ตู้ทึบ",
    "image": "40ContainerTrailer"
  },
  {
    "id": 32,
    "group_id": 7,
    "name_en": "40' Trailer - Cabinet Truck - Temperature Controlled",
    "name_th": "รถหัวลาก ห้องเย็น",
    "image": "40RefrigeratorContainerTrailer"
  }
]

export const mapTruckTypeName = (id: number | null | undefined) => {
  if (!id) return ''
  const response = truckType.find(e => e.id == id)
  return response?.name_th || ""
}
