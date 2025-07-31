use std::path::Path;

use crate::{css::compile_css, output::OutDir};

mod css;
mod output;

fn main() -> anyhow::Result<()> {
    let mut out = OutDir::new();

    out.add_file("style.css", compile_css()?);

    out.write(Path::new("./out"))?;

    Ok(())
}
