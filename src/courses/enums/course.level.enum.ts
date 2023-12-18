import { registerEnumType } from "@nestjs/graphql";


export enum CourseLevelEnum {
    Beginner = "Beginner",
    Advance = "Advance"
  }

  registerEnumType(CourseLevelEnum, {
    name: 'CourseLevelEnum',
  });
  
  