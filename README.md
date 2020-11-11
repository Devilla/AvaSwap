# EthSwap
An Ethereum Exchange for different ERC20 tokens.

## Migrations

```Migrations dry-run (simulation)
===============================
> Network name:    'kovan-fork'
> Network id:      42
> Block gas limit: 12500000 (0xbebc20)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > block number:        22036068
   > block timestamp:     1605091025
   > account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
   > balance:             3.994744075
   > gas used:            210237 (0x3353d)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.005255925 ETH

   -------------------------------------
   > Total cost:         0.005255925 ETH


2_deploy_contracts.js
=====================

   Deploying 'DevToken'
   --------------------
   > block number:        22036070
   > block timestamp:     1605091073
   > account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
   > balance:             3.9773507
   > gas used:            668372 (0xa32d4)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.0167093 ETH


   Deploying 'EthSwap'
   -------------------
   > block number:        22036071
   > block timestamp:     1605091115
   > account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
   > balance:             3.9649715
   > gas used:            495168 (0x78e40)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.0123792 ETH

   -------------------------------------
   > Total cost:           0.0290885 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.034344425 ETH





Starting migrations...
======================
> Network name:    'kovan'
> Network id:      42
> Block gas limit: 12500000 (0xbebc20)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xa136ce75a04c5629a51a392f129f17f2fee7fa1798ba4ff3df73525591b6c65f
   > Blocks: 3            Seconds: 9
   > contract address:    0xDA4c528D0E1bC5e080c40dd461322DCDF25951e8
   > block number:        22036102
   > block timestamp:     1605091152
   > account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
   > balance:             3.994369075
   > gas used:            225237 (0x36fd5)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.005630925 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.005630925 ETH


2_deploy_contracts.js
=====================

   Deploying 'DevToken'
   --------------------
   > transaction hash:    0xaecdd1f21367b6274f443ae4deb16d61fb2b852b87db77354798f5a8b928f67e
   > Blocks: 2            Seconds: 10
   > contract address:    0x68B04a6Ce5083DE24a6B6c9362DD38bd9F8A85cA
   > block number:        22036109
   > block timestamp:     1605091188
   > account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
   > balance:             3.9747257
   > gas used:            743372 (0xb57cc)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.0185843 ETH


   Deploying 'EthSwap'
   -------------------
   > transaction hash:    0xde2f02686725a14ca9e183e717f8f25cce231a73c6446fd3bd44ba45f01002b4
   > Blocks: 2            Seconds: 6
   > contract address:    0x7B9237158d64009838f1789ca05EC2683D023d30
   > block number:        22036114
   > block timestamp:     1605091208
   > account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
   > balance:             3.9612215
   > gas used:            540168 (0x83e08)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.0135042 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0320885 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.037719425 ETH
```
