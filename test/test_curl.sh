seq 1 5 | xargs -n1 -P0 -I{} curl --location 'http://localhost:3000/orders/place_order' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiV2VuZHkiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY5MTAzMDI0MCwiZXhwIjoxNjkxMTE2NjQwfQ.U8Z24qC9Ry81kIV500WyIkbqOuk9S4VGjd_JVZWQksc' \
    --data '{
        "car_id": 36,
        "pick_up_date": "2023-08-12 19:09:00",
        "pick_up_location": "Da nang",
        "drop_off_date": "2023-08-12 20:02:00",
        "drop_off_location": "Da Nang",
        "coupon_code": "COUPON2"
    }'

#This is use to test place order with same car, same time in parallel 
