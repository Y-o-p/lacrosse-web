<script lang='ts'>
    import { pushState } from "$app/navigation";

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
                    <td>{cell}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table.blueTable {
		border: 1px solid #1C6EA4;
		background-color: #EEEEEE;
		width: 90%;
		text-align: left;
		border-collapse: collapse;
	}

	table.blueTable td, table.blueTable th {
		border: 1px solid #AAAAAA;
		padding: 3px 2px;
	}

	table.blueTable tbody td {
		font-size: 16px;
	}

	table.blueTable tr:nth-child(even) {
		background: #D0E4F5;
	}

	table.blueTable thead {
		background: #1C6EA4;
		background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
		background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
		background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
		border-bottom: 2px solid #444444;
	}

	table.blueTable thead th {
		font-size: 19px;
		font-weight: bold;
		color: #FFFFFF;
		border-left: 2px solid #D0E4F5;
	}
    
	table.blueTable thead th:first-child {
		border-left: none;
	}
</style>