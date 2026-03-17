import { ImageType } from "./imageModel";
import { SkillType } from "./skillModel";

export type ProjetoStatus = "COMPLETE" | "INCOMPLETE" | "INPROGRESS";

export type ProjetoType = {
    id?: number,
    name: string,
    description?: string,
    repo?: string,
    website?: string,
    download?: string,
    status: ProjetoStatus
    techBack: SkillType[],
    techFront: SkillType[],
    images?: ImageType[]
}