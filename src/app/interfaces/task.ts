import { Timestamp } from 'rxjs';

export interface Task {
    id: string,
    title: string,
    description: string,
    completed: boolean,
    created: Date,
    isSelected?: boolean
}