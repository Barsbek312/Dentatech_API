import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBranchDto } from "./dto/createBranch.dto";

@Injectable()
export class BranchService {
    constructor(private prisma: PrismaService) {}

    async createBranch(clinicId: number, titleOfBranch: string, cityId: number, street: string): Promise<number> {
        try {
            const branchObj = await this.prisma.branch.create({
                data: {
                    branch: titleOfBranch,
                    cityId, 
                    street,
                    clinicId
                }
            })

            return branchObj.id;
        } catch(error) {
            throw error;
        }
    }

    async findById(branchId: number) {
        try {
            const branch = await this.prisma.branch.findUnique({
                where: {
                    id: branchId
                }
            })

            return branch
        } catch(err) {
            throw err;
        }
    }

    async getBranches(clinicId: string) {
        try {
            const branches = await this.prisma.branch.findMany({
                where: {
                    clinic: {
                        id: parseInt(clinicId)
                    }
                },
                select: {
                    id: true,
                    branch: true,
                    street: true,
                    clinicId: true,
                    city: {
                        select: {
                            id: true,
                            city: true
                        }
                    }

                }
            });

            const clinic = await this.prisma.clinic.findFirst({
                where: {
                    id: branches[0]?.clinicId
                }
            })


            // return [...branches, {"myBranchId": clinicId},  clinic];
            return [...branches, clinic];
        } catch(error) {
            throw error;
        }
    }
}