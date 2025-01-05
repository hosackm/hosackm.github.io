all: build

build: resume
	hugo

resume:
	resume export static/resume.pdf -r static/resume.json --theme macchiato
	qpdf --replace-input --pages . 1 -- static/resume.pdf

server:
	hugo server --buildDrafts

