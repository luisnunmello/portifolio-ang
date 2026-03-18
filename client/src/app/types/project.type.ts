import { Image } from "./image.type";
import { Skill } from "./skill.type";

export type ProjectStatus = "COMPLETE" | "INCOMPLETE" | "INPROGRESS";

export type Project = {
    id?: number,
    name: string,
    description?: string,
    repo?: string,
    website?: string,
    download?: string,
    status: ProjectStatus
    techBack: Skill[],
    techFront: Skill[],
    images?: Image[]
}