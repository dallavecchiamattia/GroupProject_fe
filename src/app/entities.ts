export type User = {
  id: string;
  email: string;
  nomeTitolare: string;
  cognomeTitolare: string;
  dataApertura: string;
  iban: string;
};

export type Categoria = {
  id: string;
  nomeCategoria: string;
  tipologia: 'Entrata' | 'Uscita';
};

export type Movimento = {
  id: string;
  contoCorrenteId: string;
  data: string;
  importo: number;
  saldo: number;
  categoriaMovimentoId: string;
  categoria: Categoria;
  descrizioneEstesa: string;
};

export type AccountMe = {
  utente: User;
  saldo: number;
  ultimiMovimenti: Movimento[];
};