#! /usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
UART=$(dmesg | grep "FTDI USB Serial Device converter now attached to" | awk '{print $NF}')
while true
do
    python3 $SCRIPT_DIR/uart.py $UART $SCRIPT_DIR
done
