{
  description = "Solar opposites lessonalyzer built with Bun + Nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/master";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        lessonalyzer_js = ./lessonalyzer.js;
      in
      with pkgs; {
        packages = rec {
          default = lessonalyzer;
          lessonalyzer = writeShellApplication {
            name = "lessonalyzer";
            runtimeInputs = [ bun figlet lolcat ];
            text = ''bun ${lessonalyzer_js}'';
          };
        };

        devShells.default = mkShell {
          buildInputs = [ bun figlet lolcat ];
        };

        formatter = nixpkgs-fmt;
      }
    );
}
