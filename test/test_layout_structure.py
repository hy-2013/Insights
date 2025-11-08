"""布局结构回归测试。"""

import os
import subprocess
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


def build_eleventy() -> None:
    """调用 Eleventy 构建以生成主页 HTML。"""

    env = os.environ.copy()
    env.setdefault("ELEVENTY_ENV", "prod")
    subprocess.run(
        ["npm", "run", "build:eleventy"],
        cwd=REPO_ROOT,
        env=env,
        check=True,
    )


def test_home_layout_structure() -> None:
    """验证主页采用预期的栅格布局结构。"""

    build_eleventy()
    html_path = REPO_ROOT / "dist" / "index.html"
    assert html_path.exists(), "构建后应生成 dist/index.html"

    html_text = html_path.read_text(encoding="utf-8")

    assert "class=\"page-layout" in html_text, "主页应包裹在 .page-layout 容器中"
    assert "page-layout__grid" in html_text, "主页应呈现主栅格布局"

    nav_index = html_text.find("page-layout__nav")
    content_index = html_text.find("page-layout__content")
    sidebar_index = html_text.find("page-layout__aside")

    assert nav_index != -1, "主栅格需包含导航列"
    assert content_index != -1, "主栅格需包含内容列"
    assert sidebar_index != -1, "主栅格需包含侧栏列"

    assert nav_index < content_index, "导航列应位于内容列之前"
    assert content_index < sidebar_index, "内容列应位于侧栏之前"

    assert "site-header" in html_text, "应渲染顶部站点头部区域"

    assert 'href="/Insights/' not in html_text, "相对链接不应包含 /Insights/ 前缀"

    search_index_path = REPO_ROOT / "dist" / "searchIndex.json"
    assert search_index_path.exists(), "构建后应生成 dist/searchIndex.json"
    search_index_text = search_index_path.read_text(encoding="utf-8")
    assert '"/Insights/' not in search_index_text, "搜索索引中的链接不应包含 /Insights/ 前缀"
