import { registerEnumType } from "@nestjs/graphql";


export enum ClassDays {
    Saturday = "Saturday",
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday"
  }

  registerEnumType(ClassDays, {
    name: 'ClassDays',
  });
  
  