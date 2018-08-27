cmd_Release/api.node := ln -f "Release/obj.target/api.node" "Release/api.node" 2>/dev/null || (rm -rf "Release/api.node" && cp -af "Release/obj.target/api.node" "Release/api.node")
