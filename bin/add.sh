#!/bin/bash

sed -i 's/<\/body>/<script defer=\"defer\" src=\"https\:\/\/kdl.kcl.ac.uk\/sla-acpp\/js\/sla.js\" type=\"text\/javascript\"><\/script>\n<\/body>/' $1
