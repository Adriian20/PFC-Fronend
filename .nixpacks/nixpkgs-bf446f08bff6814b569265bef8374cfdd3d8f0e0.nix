let
  pkgs = import (fetchTarball "https://nixos.org/channels/nixos-unstable/nixexprs.tar.xz") {};
in
with pkgs;
