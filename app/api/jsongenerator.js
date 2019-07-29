//ruches 
[
  {
    'repeat(5)': {
      	id_ruche:'{{index(1)}}',
		position_gps_ruche_latitude:'{{floating(48.6822301, 48.695261)}}',
      	position_gps_ruche_longitude:'{{floating(7.823338, 7.840531)}}'
    }
  }
]

// enregistrement

[
  {
    'repeat(100)': {
      	id_enregistrement:'{{index()}}',
		numero_ruche:'{{integer(1, 5)}}',
		date_enregistrement:'{{date(new Date(2019, 07, 1), new Date())}}',
		masse:'{{integer(60, 75)}}',
		temperature_ext:'{{integer(20, 30)}}',
		humidite_ext:'{{integer(60, 80)}}',
		nb_sortie:'{{integer(160, 180)}}',
		nb_entree:'{{integer(160, 180)}}',
		nb_repas:'{{integer(1, 5)}}',
		temperature_int:'{{integer(20, 30)}}',
		humidite_int:'{{integer(60, 80)}}',
		couleur:"brun",
		gaz:"none",
    }
  }
]