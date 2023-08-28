use aws_config::load_from_env;
use lambda_http::{run, service_fn, Body, Error, Request, Response};
use std::time::Instant;

async fn function_handler(_: Request) -> Result<Response<Body>, Error> {
    let start = Instant::now();

    let _ = load_from_env().await;

    let end = Instant::now();
    let elapsed = end - start;
    let resp = Response::builder()
        .status(200)
        .header("content-type", "text/html")
        .body(
            format!(
                "Hello from Rust! This request took {}ms",
                elapsed.as_millis()
            )
            .into(),
        )
        .map_err(Box::new)?;
    Ok(resp)
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        .with_target(false)
        .without_time()
        .init();

    run(service_fn(function_handler)).await
}
