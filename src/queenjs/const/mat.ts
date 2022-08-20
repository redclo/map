export const MatTypes = {
    MatType_Fabric3d: 1,
    MatType_SpecMat: 2,
    MatType_Fabric2d: 3, 
    MatType_LineMat:  4,
    MatType_Color: 0, //未定义 undefined or null
}

export const Asset3dNameToMatType = {
    'asset3d.linemat': MatTypes.MatType_LineMat,
    'asset3d.effect': MatTypes.MatType_SpecMat,
    'asset3d.fabric3d': MatTypes.MatType_Fabric3d,
    'asset3d.fabric2d': MatTypes.MatType_Fabric2d,
    'asset3d.color': MatTypes.MatType_Color,
    'linemat': MatTypes.MatType_LineMat,
    'effect': MatTypes.MatType_SpecMat,
    'fabric3d': MatTypes.MatType_Fabric3d,
    'fabric2d': MatTypes.MatType_Fabric2d,
    'color': MatTypes.MatType_Color
}

export const Asset3dNames = {
    linemat: 'asset3d.linemat',
    effect: 'asset3d.effect',
    fabric3d: 'asset3d.fabric3d',
    fabric2d: 'asset3d.fabric2d',
    color: 'asset3d.color'
}