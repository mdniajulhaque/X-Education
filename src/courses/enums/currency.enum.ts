import { registerEnumType } from "@nestjs/graphql";


export enum Currency {
    BDT = "BDT",
    USD = "USD"
  }

  registerEnumType(Currency, {
    name: 'Currency',
  });
  
  