import { Image } from "./image.type"

export type SkillCategory = "LANGUAGE" | "FRAMEWORK" | "DATABASE" | "VERSIONING" | "OPERATIONAL_SYSTEM";

export type Technology = "BACKEND" | "FRONTEND";

export type Skill = {
    id?: number,
    name: string,
    image?: Image,
    category: SkillCategory,
    type: Technology
}