interface options {
  offsetTop?: string
  offsetBottom?: string
  offsetStart?: string
  offsetEnd?: string
}

const buildObjectResponse = (imgName: string, aspectRatio: string, size?: string | null | undefined,
  mode?: string | null, options?: options | null | undefined) => {
  return {
    name: imgName,
    size: size || 'full',
    aspectRatio: aspectRatio,
    aspectMode: mode || 'fit',
    ...(options ? { options } : undefined)
  }
}
export const MapTruckImageName = (id: any) => {
  if (id == 1 || id == "fourWheelsTruck") return buildObjectResponse("Truck1", "29:17", "full", null) // รถกระบะ 4 ล้อ
  else if (id == 2 || id == "4WheelsFlatbed") return buildObjectResponse("Truck7", "29:17", "full", null) // รถกระบะ 4 ล้อ พื้นเรียบ
  else if (id == 3 || id == "4wheelsOpenPickup") return buildObjectResponse("Truck6", "29:17", "full", null) // รถกระบะ 4 ล้อ คอก
  else if (id == 4 || id == "4WheelsCabinetPickup") return buildObjectResponse("Truck3", "29:17", "full", null) // รถกระบะ 4 ล้อ ตู้ทึบ
  else if (id == 5 || id == "4WheelsRefrigeratorPickup") return buildObjectResponse("Truck4", "29:17", "full", null, { offsetStart: "20px" }) // รถกระบะ 4 ล้อ ห้องเย็น
  else if (id == 6 || id == "4WheelsCap") return buildObjectResponse("Truck5", "29:17", "5xl", null) // รถกระบะ 4 ล้อ หลังคาสูงทึบ


  else if (id == 7 || id == "6WheelsFlatbed") return buildObjectResponse("Truck9", "29:17", "full", null) // รถ 6 ล้อ พื้นเรียบ
  else if (id == 8 || id == "6WheelsOpenTop") return buildObjectResponse("Truck8", "29:17", "full", null) // รถ 6 ล้อ กระบะ
  else if (id == 9 || id == "6WheelsBox") return buildObjectResponse("Truck12", "29:17", "full", null) // รถ 6 ล้อ คอก
  else if (id == 10 || id == "6WheelsCabinet") return buildObjectResponse("Truck10", "29:17", "full", null) // รถ 6 ล้อ ตู้ทึบ
  else if (id == 11 || id == "6WheelsRefrigerator") return buildObjectResponse("Truck11", "29:17", "full", null) // รถ 6 ล้อ ห้องเย็น
  else if (id == 12 || id == "6WheelsLiquidTank") return buildObjectResponse("Truck13", "29:17", "full", null) // รถ 6 ล้อ บรรทุกของเหลว
  else if (id == 13 || id == "6WheelsCrane") return buildObjectResponse("Truck14", "29:17", "full", null) // รถ 6 ล้อ เครน


  else if (id == 14 || id == "10WheelsFlatbed") return buildObjectResponse("Truck20", "29:17", "full", null) // รถ 10 ล้อ พื้นเรียบ
  else if (id == 15 || id == "10WheelBox") return buildObjectResponse("Truck17", "29:17", "full", null)  // รถ 10 ล้อ คอก
  else if (id == 16 || id == "10WheelsCabinet") return buildObjectResponse("Truck15", "29:17", "full", null)  // รถ 10 ล้อ ตู้ทึบ
  else if (id == 17 || id == "10WheelsRefrigerator") return buildObjectResponse("Truck16", "29:17", "full", null)  // รถ 10 ล้อ ห้องเย็น
  else if (id == 18 || id == "10WheelsChemicalLiquidTank") return buildObjectResponse("Truck21", "29:17", "full", null)  // รถ 10 ล้อ เคมีภัณฑ์
  else if (id == 19 || id == "10WheelsLiquidTank") return buildObjectResponse("Truck22", "29:17", "full", null)  // รถ 10 ล้อ บรรทุกของเหลว
  else if (id == 20 || id == "tenWheelsFuelTanker") return buildObjectResponse("Truck23", "29:17", "full", null)  // รถ 10 ล้อ บรรทุกน้ำมัน
  else if (id == 21 || id == "10WheelsMobileCrane") return buildObjectResponse("Truck19", "29:17", "full", null) // รถ 10 ล้อ เครน


  else if (id == 22 || id == "18WheelsFlatbed") return buildObjectResponse("Truck26", "29:17", "full", null) // รถเทรลเลอร์ พื้นเรียบ
  else if (id == 23 || id == "fortyTrailer18WheelsStallTruck") return buildObjectResponse("Truck32", "29:17", "full", null)   // รถเทรลเลอร์ คอก
  else if (id == 24 || id == "20Trainer18WheelsStallDump") return buildObjectResponse("Truck31", "29:17", "full", null) // รถ 10 ล้อ พ่วงคอก
  else if (id == 25 || id == "20Trailer18WheelsCabinet") return buildObjectResponse("Truck29", "29:17", "full", null) // รถ 10 ล้อ พ่วงตู้ทึบ
  else if (id == 26 || id == "20Trailer18WheelsRefrigerator") return buildObjectResponse("Truck30", "29:17", "full", null) // รถ 10 ล้อ พ่วงห้องเย็น


  else if (id == 27 || id == "12WheelsCarCarrier") return buildObjectResponse("Truck35", "29:17", "full", null) // รถบรรทุกรถ
  else if (id == 28 || id == "6WheelsMotobikeCarrier") return buildObjectResponse("Truck36", "29:17", "full", null)  // รถบรรทุกจักรยานยนต์
  else if (id == 29 || id == "other") return buildObjectResponse("Truck1", "29:17", "full", null) // อื่นๆ
  else if (id == 30 || id == "tractorHeadTruck") return buildObjectResponse("Truck27", "29:17", "full", null) // รถหัวลาก
  else if (id == 31 || id == "40ContainerTrailer") return buildObjectResponse("Truck25", "29:17", "full", null) // รถหัวลาก ตู้ทึบ
  else if (id == 32 || id == "40RefrigeratorContainerTrailer") return buildObjectResponse("Truck24", "29:17", "full", null)  // รถหัวลาก ห้องเย็น


  else return buildObjectResponse("Truck1", "29:17", "full", null)

}

