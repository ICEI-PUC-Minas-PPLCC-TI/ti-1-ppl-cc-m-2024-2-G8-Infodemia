{
  description = "Nix flake for json-server";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      pkgs = import nixpkgs {
        system = "x86_64-linux"; # Change according to your system, e.g., "aarch64-darwin" for Mac M1/M2
      };
    in
    {
      devShell.x86_64-linux = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs
          pkgs.nodePackages.json-server
        ];
      };
    };
}

