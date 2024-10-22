export class ScottState {
	value = $state(1);

	up() {
		this.value++;
	}
}

export function createState() {
	let value = $state(4);

	function up() {
		value++;
	}

	return {
		get value() {
			return value;
		},
		set value(newValue) {
			value = newValue;
		},
		up
	};
}
