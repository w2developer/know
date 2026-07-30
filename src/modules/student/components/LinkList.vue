<template>
    <div class="link-list">
        <slot></slot>
    </div>
</template>

<style>
	.link-list {
		gap: 1rem;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
	}
	.link-list .item {
		opacity: .8;
        display: flex;
        align-items: center;
		transition: .3s ease;
        justify-content: space-between;
		border-radius: var(--k-size-4);
		background: var(--color-gray-900);
		border: 1px solid var(--color-gray-800);
		padding: var(--k-size-10) var(--k-size-16);
	}
	.link-list .item:hover {
		opacity: 1;
		border: 1px solid var(--color-gray-700);
	}

    @media screen and (max-width: 530px) {
        .link-list {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }
    @media screen and (max-width: 300px) {
        .link-list {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }
    }
</style>