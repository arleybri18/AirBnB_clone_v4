$(document).ready(
		let ams_check = [];
		console.log("Hola");
		$("INPUT").change(function (){
			ams_check.push($(this:checked).attr("data-id"));
			console.log(ams_check);
		})
		)
