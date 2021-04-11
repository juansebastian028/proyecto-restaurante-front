document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById("menu-toggle").addEventListener('click', function(e){
		document.getElementById("wrapper").classList.toggle("toggled");
	});
});
