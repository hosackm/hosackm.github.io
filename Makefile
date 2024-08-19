all: build

build: resume
	hugo

resume:
	resume export content/resume/resume.pdf -r content/resume/resume.json --theme macchiato
	qpdf --replace-input --pages . 1 -- content/resume/resume.pdf

server:
	hugo server
