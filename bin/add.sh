#!/bin/bash

OPTIND=1

URL="\"https\:\/\/kdl.kcl.ac.uk\/sla-acpp\/js\/sla.js\""
XML=""

while getopts "dx" opt; do
    case "$opt" in
        d)
            URL="\"https\:\/\/rawgit.com\/kingsdigitallab\/sla-acpp\/develop\/js\/sla.js\""
            ;;
        x)
            XML="\&#160;"
            ;;
    esac
done

shift $((OPTIND-1))

sed -i "s,<\/body>,<script defer=\"defer\" src=$URL type=\"text\/javascript\">$XML<\/script>\n<\/body>," $@