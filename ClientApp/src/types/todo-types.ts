export interface Todo {
	id: number;
	title: string;
	isCompleted: boolean;
	userId: number;
	lastUpdate: Date;
	lastStatusUpdate: Date;
}

export interface CreateTodo {
	title: string;
	isCompleted: boolean;
	userId: number;
}

export interface UpdateTodo {
	id: number;
	title: string;
	isCompleted: boolean;
	userId: number;
}

export interface DeleteTodo {
	id: number;
	userId: number;
}