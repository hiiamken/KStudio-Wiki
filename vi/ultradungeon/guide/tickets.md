# Hệ thống Ticket

## Tổng quan

Hệ thống ticket giới hạn số lần vào dungeon mỗi ngày.

## Cấu hình

### Toggle toàn cục
```yaml
gameplay:
  tickets:
    enabled: true
```

### Toggle theo dungeon
```yaml
Access:
  TicketEnabled: true
  TicketCost: 1
```

## Cách hoạt động

1. Người chơi nhận ticket hàng ngày theo permission
2. Vào dungeon trừ `TicketCost` ticket
3. Ticket reset lúc nửa đêm
4. Ticket bonus là **tạm thời** — cũng reset hàng ngày

## Quyền

| Quyền | Mô tả |
|---|---|
| `ultradungeon.ticket.<số>` | Đặt giới hạn ticket (giá trị cao nhất thắng) |
| `ultradungeon.ticket.unlimited` | Bỏ qua giới hạn |
