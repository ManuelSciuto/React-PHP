export enum MarcheMezzi {
  AP = "Aprilia",
  BN = "Benelli",
  BW = "BMW",
  DC = "Ducati",
  FN = "Fantic",
  GG = "GasGas",
  HD = "Harley Davidson",
  HN = "Honda",
  HV = "Husqvarna",
  KV = "Kawasaki",
  KM = "KTM",
  MG = "Guzzi",
  MV = "MV Augusta",
  PG = "Piaggio",
  RY = "Royal Enfield",
  SH = "Sherco",
  SZ = "Suzuki",
  TM = "TM",
  TR = "Triumph",
  YM = "Yamaha",
}

export const MarcheMezziOpts = Object.entries(MarcheMezzi).map(
  ([value, label]) => ({
    value: value,
    label: label,
  })
);

export const getMarcaFromSigla = (sigla: string): string => {
  return MarcheMezzi[sigla as keyof typeof MarcheMezzi];
};

export const getSiglaFromMarca = (marca: string): string | undefined => {
  const sigla = Object.entries(MarcheMezzi).find(
    ([_, value]) => value === marca
  );
  return sigla ? sigla[0] : undefined;
};
