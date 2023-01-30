#!/bin/bash

# Check if another instance of this script is running
pidof -o %PPID -x $0 >/dev/null && echo "ERROR: Script $0 already running" && exit 1

# Run command & store PID
$1 $2 & pid = $!