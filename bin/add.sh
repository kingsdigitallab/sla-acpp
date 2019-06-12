#!/bin/bash

OPTIND=1

URL="https\:\/\/kdl.kcl.ac.uk\/sla-acpp\/js"
SCRIPT="sla.js"
XML=""

while getopts "dsx" opt; do
    case "$opt" in
        d)
            URL="https\:\/\/rawgit.com\/kingsdigitallab\/sla-acpp\/develop\/js"
            ;;
        s)
            SCRIPT="static.js"
            ;;
        x)
            XML="\&#160;"
            ;;
    esac
done

URL="\"$URL\/$SCRIPT\""

sed -i "s,<\/body>,<script defer=\"defer\" src=$URL type=\"text\/javascript\">$XML<\/script>\n<\/body>," $@
