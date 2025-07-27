use crate::css::compile_css;

mod css;

fn main() -> anyhow::Result<()>{
    compile_css()?;
    Ok(())
}
