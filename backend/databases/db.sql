CREATE TABLE libros (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    imagen_id VARCHAR(100),
    url_id VARCHAR(100) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR (100) NOT NULL,
    sipnosis TEXT,
    paginas INTEGER(20),
    genero VARCHAR(30),
    idioma VARCHAR(20) DEFAULT 'Español'
)

CREATE TABLE imagenes (
    id_imagen VARCHAR(100) PRIMARY KEY,
    nombre_nuevo VARCHAR(100),
    nombre_archivo VARCHAR(100),
)


CREATE TABLE archivos (
    id_url VARCHAR(100) PRIMARY KEY,
    nombre_nuevo_url VARCHAR(100),
    nombre_archivo_url VARCHAR(100),
)

