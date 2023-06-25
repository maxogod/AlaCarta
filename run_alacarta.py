import subprocess
import sys

command = sys.argv[1] if len(sys.argv) >= 2 else 'dev'

backend = r"C:\Users\SomeUserName\AlaCarta\backend"
frontend = r"C:\Users\SomeUserName\AlaCarta\frontend"

run_server = f"npm run {command}"

subprocess.Popen(["start", "powershell.exe", "-NoExit", "-Command", f"cd \"{backend}\"; {run_server}"], shell=True)
subprocess.Popen(["start", "powershell.exe", "-NoExit", "-Command", f"cd \"{frontend}\"; {run_server}"], shell=True)

print(f"\033[92mRunning servers for frontend and backend with command \033[94m{command}\033[0m...")
