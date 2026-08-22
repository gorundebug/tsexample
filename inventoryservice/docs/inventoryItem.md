# Pipeline: inventoryItem

```mermaid
flowchart LR
  s3[["Get Inventory Item Data
OrderItemResult"]]
  s4[/"Get Inventory Item Error
OrderItemResult"/]
  s5(("Merge Inventory Result"))
  s6(["Process Inventory Item 
OrderItem"])
  s6 --> s3
  s3 --> s4
  s3 --> s5
  s4 --> s5
  s5 --> s6
```
