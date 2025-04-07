import { ImageType } from "./imageModel"

// Language,
// Framework,
// Database,
// Versioning,
// OperationalSystem

export type SkillCategory = "LANGUAGE" | "FRAMEWORK" | "DATABASE" | "VERSIONING" | "OPERATIONAL_SYSTEM";

export type TechnologyTypeEnum = "BACKEND" | "FRONTEND";

export type SkillType = {
    
    // private @Id @GeneratedValue Long id;
    // private @NotNull @Column(nullable = false) String name;
    // private @OneToOne(targetEntity = ImageEntity.class) List<ImageEntity> img = new ArrayList<>();
    // private SkillCategory category;
    // private TechnologyTypeEnum type;
    
    id?: number,
    name: String,
    image?: ImageType,
    category: SkillCategory,
    type: TechnologyTypeEnum
    
}