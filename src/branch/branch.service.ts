import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BranchService {
    constructor(private prisma: PrismaService) {}

    async createBranch(clinicId: number, titleOfBranch: string): Promise<number> {
        try {
            const branchObj = await this.prisma.branch.create({
                data: {
                    branch: titleOfBranch,
                    clinicId
                }
            })

            return branchObj.id;
        } catch(error) {
            throw error;
        }
    }

    async getBranches(branchId: string) {
        try {
            const branches = await this.prisma.branch.findMany({
                where: {
                    clinic: {
                        id: parseInt(branchId)
                    }
                },
            });

            const clinic = await this.prisma.clinic.findFirst({
                where: {
                    id: branches[0]?.clinicId
                }
            })


            return [...branches, {"myBranchId": branchId},  clinic];
        } catch(error) {
            throw error;
        }
    }
}