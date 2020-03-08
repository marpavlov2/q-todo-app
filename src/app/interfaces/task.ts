import { Timestamp } from 'rxjs';

export interface Task {
    id: string | number,
    title: string,
    description: string,
    completed: boolean,
    created: Date,
    isSelected?: boolean
}