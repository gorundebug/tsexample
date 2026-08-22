# Pipeline: order

```mermaid
flowchart LR
  subgraph ext[" "]
    style ext fill:#f5f5f5,stroke:#bbb,stroke-dasharray:4
    s7[/"ProcessOrderItemError
OrderState"/]
  end
  s8["Map Order Item Result To Order State
OrderState"]
  s9["MapToOrderProcessed
OrderProcessed"]
  s10["Map to Order State
OrderState"]
  s11(("Merge Results"))
  s12(["Process Order
Order"])
  s13[\"Process Order Item
OrderItemResult"/]
  s14["Process Order Items
OrderItem"]
  s15[\"Publish Order Processed
OrderProcessed"/]
  s16["Soft Deadline"]
  s17["Split Order Result"]
  s18["Split Pipeline"]
  s13 --> s8
  s17 --> s9
  s16 --> s10
  s10 --> s11
  s8 --> s11
  s7 -.-> s11
  s17 --> s12
  s14 --> s13
  s18 --> s14
  s9 --> s15
  s18 --> s16
  s11 --> s17
  s12 --> s18
```
