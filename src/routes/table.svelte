<script lang='ts'>

	export let tableData = [
		{
			"Heading 1" : "data11",
			"Heading 2" : "data12",
			"Heading 3" : "data13"
		},
		{
			"Heading 1" : "data21",
			"Heading 2" : "data22",
			"Heading 3" : "data23"
		}
	];
	export let style;

	export let routeData = null;

	let dupeIDs = []

	function isDate(value) {
		let str = value.toString();
		let num = Number(str[0]);
		if (!Number.isNaN(num)) {
			return true;
		}
		return false;
	}

	function isInvalidType(value) {
		if (typeof value === 'number') {
			return true;
		}

		if (isDate(value)) {
			return true;
		}

		return false; 
	}

	function getCol(data) {
		let column = null;
		for (let row in tableData) {
			for (let col in tableData[row])	{
				if (tableData[row][col] == data) {
					column = col;
				}
			}

		}
		return column;
	}

	function isValidCol(col) {
		switch(col) {
			case "Location":
			case "Coach":
			case "Class":
			case "Home Town":
			case "Position":
			case "Major":
			case "REFS":
			case "TKS":
			case "SKS":
				return false;
			default:
				return true;
		}
	}

	function getRouteId(data, col) {
		let route = "/";
		let page = "";
		let slug = "";
		switch(col) {
			case "Game":
			case "Opponent":
				page = "games";
				break;
			case "Home Team":
			case "Away Team":
			case "Team":
				page = "teams";
				break;
			case "Name":
			case "Player":
				page = "players"
		}

		for (let map in routeData) {
			for (let key of routeData[map].keys()) {
				if (data == key) {
					let id = routeData[map].get(key);
					slug = id;
				}
			}
		}

		route += page + "/";
		route += slug;
		return route;
	}

	function returnCell(cell) {
		let string = "";
		if (cell != null) {
			if (!isInvalidType(cell)) {
				let col = getCol(cell);
				if (isValidCol(col)) {
					if (routeData != null) {
						string = `<a href="${getRouteId(cell, col)}">${cell}</a>`
					} else {
						string = `${cell}`;
					}
				} else {
					string = `${cell}`;
				}
			} else {
				string = `${cell}`;	
			}
		} else {
			string = `${cell}`;
		}
		return string;
	}

</script>

<table class={style}>
	<thead>
		<tr>
			{#each Object.keys(tableData[0]) as columnHeading}
				<th>{columnHeading}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each Object.values(tableData) as row}
			<tr>
				{#each Object.values(row) as cell}
					<td>
						{@html returnCell(cell)}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
    table.blueTable {
		width: 100%;
		text-align: center;
		border-collapse: collapse;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}

	table.blueTable td{
		border-style: hidden!important;;
		border: 0.5px solid #b1b1b1;
		padding: 3px 2px;
	}

	table.blueTable tbody td {
		font-size: 16px;
	}

	table.blueTable tr:nth-child(even) {
		background: #e0f8d0;
	}

	table.blueTable thead {
		background: #346856;
		border-bottom: 2px solid #346856;
		position: sticky;
		top: -1px;
		z-index: 9;
	}

	table.blueTable thead th {
		font-size: 16px;
		font-weight: bold;
		color: white;
		position: sticky;
		top: 0px;
		z-index: 9;
	}
    
	table.blueTable thead th:first-child {
		border-left: none;
	}

	table.blueTable tbody tr:hover{
		background-color: lightgrey;
	}
</style>