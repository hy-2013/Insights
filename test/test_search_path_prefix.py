from pathlib import Path


def test_search_fetch_uses_url_filter_for_prefix():
    search_script = Path(
        "src/site/_includes/components/searchScript.njk"
    ).read_text(encoding="utf-8")

    assert "fetch('/searchIndex.json" not in search_script
    assert "fetch(\"/searchIndex.json" not in search_script
    assert "| url" in search_script, "搜索脚本未通过 Eleventy url 过滤器注入路径前缀"
