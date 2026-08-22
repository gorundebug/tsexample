# Pipeline: default

```mermaid
flowchart LR
  subgraph ext[" "]
    style ext fill:#f5f5f5,stroke:#bbb,stroke-dasharray:4
    s13[\"Process Order Item
OrderItemResult"/]
  end
  s7[/"ProcessOrderItemError
OrderState"/]
  s13 -.-> s7
```
