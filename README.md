# NSOS

NASZ System Obsługi Studentów

Twórcy - studenci Politechniki Wrocławskiej:

- Paweł Jurek
- Przemysław Kojs
- Krystian Ogonowski
- Dawid Zaremba

Projekt jest tworzony na potrzeby zaliczenia przedmiotu o nazwie _Projekt Zespołowy_, ale - jeżeli będzie miał wysoki potencjał - z pewnością będzie kontynuowany.

## IaC

for terraform installation refer to: https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli

you'll also need aws cli as we're working with aws: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

## Optional but highly recommended

Setup git hooks

```bash
chmod +x .githooks/*
```

and set git hooks directory path

```bash
git config --local core.hooksPath .githooks/
```
