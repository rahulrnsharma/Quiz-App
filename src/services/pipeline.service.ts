import { PipelineStage } from "mongoose";
import { SortOrderEnum } from "src/enum/common.enum";

export class PipelineService {
    static match = (_match: any): PipelineStage.Match => {
        return { $match: _match };
    }
    static sort = (field: string, order: string): PipelineStage.Sort => {
        let _sort: any = {};
        _sort[field] = order == SortOrderEnum.ASC ? 1 : -1;
        return { $sort: _sort };
    }
    static skip = (page: number, limit: number): PipelineStage.Skip => {
        return { $skip: (page - 1) * limit };
    }
    static limit = (limit: number): PipelineStage.Limit => {
        return { $limit: limit };
    }
    static unwind = (path: string, preserve: boolean): PipelineStage.Unwind => {
        return { $unwind: { path: `$${path}`, preserveNullAndEmptyArrays: preserve } };
    }
    static lookup = (from: string, localField: string, foreignField: string, as: string, pipeline: Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>[]): PipelineStage.Lookup => {
        return {
            $lookup: {
                from: from,
                localField: localField,
                foreignField: foreignField,
                pipeline: pipeline,
                as: as
            }
        };
    }
    static lookupWithlet = (from: string, customlet: any, localField: string, foreignField: string, as: string, pipeline: Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>[]): PipelineStage.Lookup => {
        return {
            $lookup: {
                from: from,
                let: customlet,
                localField: localField,
                foreignField: foreignField,
                pipeline: pipeline,
                as: as
            }
        };
    }
    static addFeild = (field: string, key: any): PipelineStage.AddFields => {
        let _addField: any = {};
        _addField[field] = key;
        return { $addFields: _addField };
    }
    static group = (group: any): PipelineStage.Group => {
        return { $group: { ...group } };
    }
    static include = (project: any, withBy: boolean, withDate: boolean): PipelineStage.Project => {
        if (withBy) {
            project = { ...project, createdBy: 1, updatedBy: 1 }
        }
        if (withDate) {
            project = { ...project, createdAt: 1, updatedAt: 1 }
        }
        return { $project: { ...project } };
    }
    static exclude = (project: any, withBy: boolean, withDate: boolean): PipelineStage.Project => {
        if (withBy) {
            project = { ...project, createdBy: 0, updatedBy: 0 }
        }
        if (withDate) {
            project = { ...project, createdAt: 0, updatedAt: 0 }
        }
        return { $project: { ...project } };
    }
}