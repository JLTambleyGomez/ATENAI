;; title: nft
;; description: smart contract that deploys an nft

;; traits
(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

;; token definitions
(define-non-fungible-token atenai uint)

;; constants
(define-constant contract-owner tx-sender)
(define-constant err-sender-same-recipient (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-token-id-dont-exist (err u102))
(define-constant err-ipfs-hash-dont-exist (err u103))

;; data vars
(define-data-var last-token-id uint u0)

;; data map
(define-map tokens principal uint)
(define-map ipfs uint (string-ascii 256))

;; public functions
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender sender) err-not-token-owner)
        (asserts! (not (is-eq sender recipient)) err-sender-same-recipient)
        (asserts! (is-eq (unwrap-panic (map-get? tokens sender)) token-id) err-token-id-dont-exist)
        (nft-transfer? atenai token-id sender recipient)
    )
)

(define-public (mint (recipient principal) (ipfs-hash (string-ascii 256)))
    (let
        (
            (token-id (+ (var-get last-token-id) u1))
        )
        (asserts! (not (is-eq tx-sender recipient)) err-sender-same-recipient)
        (try! (nft-mint? atenai token-id recipient))
        (map-insert tokens recipient token-id)
        (asserts! (is-eq (unwrap-panic (map-get? ipfs token-id)) ipfs-hash) err-ipfs-hash-dont-exist)
        (map-insert ipfs token-id ipfs-hash)
        (var-set last-token-id token-id)
        (ok token-id)
    )
)

;; read only functions
(define-read-only (get-last-token-id)
    (ok (var-get last-token-id))
)

(define-read-only (get-token-uri (token-id uint))
    (ok (map-get? ipfs token-id))
)

(define-read-only (get-owner (token-id uint))
    (ok (nft-get-owner? atenai token-id))
)

(define-read-only (get-token-id (owner principal))
    (ok (map-get? tokens owner))
)