FROM golang:alpine AS builder

WORKDIR /go/bin/app
COPY ./app .

# RUN go build -ldflags '-w -s' -a -installsuffix cgo -o .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o .

FROM scratch
COPY --from=builder /go/bin/app/app app
ENTRYPOINT ["./app"]
