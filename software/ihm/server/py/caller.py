from subprocess import Popen, PIPE
import json
  
# Initialise the data
array = [1,2,3,4,5,6,7,8,9,10]
data = {'array':array}
  
# Stringify the data.
stingified_data = json.dumps(data)
  
# Call the node process and pass the
# data as command line argument
process = Popen(['node', 'arraysum.js', 
        stingified_data], stdout=PIPE)
  
# This line essentially waits for the 
# node process to complete and then
# read stdout data
stdout = process.communicate()[0]
  
# The stdout is a bytes string, you can
# convert it to another encoding but
# json.loads() supports bytes string
# so we aren't converting
  
# Parse the data into json
result_data = json.loads(stdout)
array_sum = result_data['sum']
print('Sum of array from Node.js process =',array_sum)