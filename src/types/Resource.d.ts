export interface Resource {
	description: string;
	id: string;
	name: string;
	rating?: null | number;
	onLocker?: boolean;
	picture_name?:string;
}